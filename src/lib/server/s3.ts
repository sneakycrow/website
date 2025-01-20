// A function for creating a new multipart upload
import {
  CompleteMultipartUploadCommand,
  type CompleteMultipartUploadCommandInput,
  CreateMultipartUploadCommand,
  ListObjectsV2Command,
  type Part,
  PutObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "$env/dynamic/private";

// A function for initializing an S3 client
type EnabledS3Provider = "do" | "cloudflare-r2";
export const getS3Client = (provider: EnabledS3Provider = "cloudflare-r2"): S3Client => {
  switch (provider) {
    case "do":
      return getDigitalOceanS3Client();
    case "cloudflare-r2":
      return getCloudflareR2Client();
    default:
      throw new Error(`Invalid S3 provider: ${provider}`);
  }
};

// A function for construction a Digital Ocean specific S3 client
export const getDigitalOceanS3Client = (): S3Client => {
  try {
    const accessKeyId = env.DO_ACCESS_KEY_ID;
    if (!accessKeyId) {
      throw new Error("Access key ID is undefined");
    }

    const secretAccessKey = env.DO_SECRET_ACCESS_KEY;
    if (!secretAccessKey) {
      throw new Error("Secret access key is undefined");
    }
    return new S3Client({
      forcePathStyle: false, // Configures to use subdomain/virtual calling format.
      endpoint: "https://nyc3.digitaloceanspaces.com",
      region: "us-east-1",
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  } catch (error) {
    throw new Error(`Error initializing S3 client: ${error}`);
  }
};

// A function for construction a Cloudflare R2 specific S3 client
export const getCloudflareR2Client = (): S3Client => {
  try {
    const accessKeyId = env.R2_ACCESS_KEY;
    if (!accessKeyId) {
      throw new Error("R2 Access key ID is undefined");
    }

    const secretAccessKey = env.R2_SECRET_KEY;
    if (!secretAccessKey) {
      throw new Error("R2 Secret access key is undefined");
    }

    const accountId = env.R2_ACCOUNT_ID;
    if (!accountId) {
      throw new Error("R2 Account ID is undefined");
    }

    return new S3Client({
      region: "auto", // R2 only uses 'auto' as region
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  } catch (error) {
    throw new Error(`Error initializing R2 client: ${error}`);
  }
};

// A function for properly prefixing a file key
export const createBucketKeyFromFile = (fileName: string): string => {
  const prefix = env.UPLOADS_PREFIX;
  if (!prefix) {
    return fileName;
  }
  return `${prefix}/${fileName}`;
};

// A function for getting a pre-signed URL for uploading a file
export const getUploadURL = (fileKey: string): Promise<string> => {
  try {
    const client = getS3Client();
    const bucket = getUploadsBucket();
    const key = createBucketKeyFromFile(fileKey);
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key
    });

    return getSignedUrl(client, command, { expiresIn: 3600 });
  } catch (error) {
    throw new Error(`Error initializing S3 client: ${error}`);
  }
};

// A function for getting the uploads bucket
export const getUploadsBucket = (): string => {
  const bucket = env.UPLOADS_BUCKET;

  if (!bucket) {
    throw new Error("Uploads bucket is undefined");
  }

  return bucket;
};

// A function for starting a new multipart upload
export const startMultipartUpload = async (
  client: S3Client,
  fileKey: string,
  bucket: string
): Promise<string> => {
  try {
    const key = createBucketKeyFromFile(fileKey);
    const { UploadId } = await client.send(
      new CreateMultipartUploadCommand({
        Bucket: bucket,
        Key: key
      })
    );

    if (!UploadId) {
      throw new Error("UploadId is undefined");
    }

    return UploadId;
  } catch (error) {
    throw new Error(`Error creating multipart upload: ${error}`);
  }
};

// A function for finalizing a multipart upload
export const completeMultipartUpload = async (
  client: S3Client,
  key: string,
  bucket: string,
  uploadID: string,
  parts?: Part[]
) => {
  try {
    const input = {
      Bucket: bucket,
      Key: createBucketKeyFromFile(key),
      UploadId: uploadID,
      MultipartUpload: {
        Parts: parts
      }
    } satisfies CompleteMultipartUploadCommandInput;
    const command = new CompleteMultipartUploadCommand(input);
    await client.send(command);
  } catch (error) {
    throw new Error(`Error completing multipart upload: ${error}`);
  }
};

// A function for generating a list of pre-signed URLs for uploading parts of a file
export const getUploadPartURLs = async (fileKey: string, parts: number): Promise<string[]> => {
  try {
    const partURLs = [];
    // For each part, create a new pre-signed URL
    for (let i = 0; i < parts; i++) {
      const client = getS3Client();
      const bucket = getUploadsBucket();
      const url = getSignedUrl(
        client,
        new PutObjectCommand({
          Bucket: bucket,
          Key: createBucketKeyFromFile(fileKey),
          ContentType: "application/octet-stream"
        }),
        { expiresIn: 3600 }
      );
      partURLs.push(url);
    }

    return await Promise.all(partURLs);
  } catch (error) {
    throw new Error(`Error getting upload part URLs: ${error}`);
  }
};

// A function for generating a single pre-signed URL for uploading an entire file
export const getSingleUploadURL = async (fileKey: string): Promise<string> => {
  try {
    const client = getS3Client();
    const bucket = getUploadsBucket();
    return getSignedUrl(
      client,
      new PutObjectCommand({
        Bucket: bucket,
        Key: createBucketKeyFromFile(fileKey),
        ContentType: "application/octet-stream"
      }),
      { expiresIn: 3600 }
    );
  } catch (error) {
    throw new Error(`Error getting single upload URL: ${error}`);
  }
};

// A function for fetching all files for a given campaign
export const getAllFiles = async (prefix?: string): Promise<string[]> => {
  try {
    const client = getS3Client();
    const bucket = getUploadsBucket();

    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix
    });

    const response = await client.send(command);
    const files =
      response.Contents?.map((file) => {
        const key = file.Key || "";
        // Remove the campaignId prefix and any leading '/'
        return key.replace(new RegExp(`^${prefix}/?`), "");
      }).filter((key) => key !== "") || [];
    return files;
  } catch (error) {
    throw new Error(`Error fetching campaign files: ${error}`);
  }
};
