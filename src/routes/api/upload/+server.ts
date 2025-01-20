import {
  completeMultipartUpload,
  getS3Client,
  getUploadPartURLs,
  getUploadsBucket,
  startMultipartUpload
} from "$lib/server/s3";
import type { Part } from "@aws-sdk/client-s3";
import { redirect, type RequestHandler } from "@sveltejs/kit";

const startUpload = async (fileKey: string, parts: number) => {
  // Generate a new multipart upload for the file
  const client = getS3Client();
  const bucket = getUploadsBucket();
  const uploadId = await startMultipartUpload(client, fileKey, bucket);
  // Generate a list of pre-signed URLs for each part
  const urls = await getUploadPartURLs(fileKey, parts);
  return {
    uploadId,
    urls
  };
};

const finishUpload = async (uploadId: string, fileKey: string, etags?: Part[]) => {
  // Complete the multipart upload
  const client = getS3Client();
  const bucket = getUploadsBucket();
  await completeMultipartUpload(client, fileKey, bucket, uploadId, etags);
};

interface UploadRequest {
  fileKey?: string;
  parts?: number;
  uploadId?: string;
  etags?: Part[];
  command: "start" | "finish";
}

export const POST: RequestHandler = async ({ locals, request }) => {
  try {
    if (!locals.user) redirect(302, "/login");
    if (locals.user?.role !== "ADMIN") redirect(302, "/");

    const data = (await request.json()) as UploadRequest;
    const { fileKey, parts, uploadId, etags, command } = data;
    if (!command) {
      return new Response("Bad request, command required", { status: 400 });
    }

    // If the command is not start or finish, return a 501
    if (command !== "start" && command !== "finish") {
      return new Response("Not implemented", { status: 501 });
    }

    if (command === "start") {
      // The start command requires a fileKey and parts
      if (!fileKey || !parts) {
        return new Response("Bad request, fileKey and parts required", { status: 400 });
      }
      // Start the upload and return the uploadId and pre-signed URLs
      const { uploadId, urls } = await startUpload(fileKey, parts);
      return new Response(JSON.stringify({ uploadId, urls }));
    }

    if (command === "finish") {
      // The finish command requires an uploadId, fileKey, and etags
      if (!uploadId || !fileKey) {
        return new Response("Bad request, uploadId, fileKey, and etags required", { status: 400 });
      }
      // Finish the upload and return the version id
      await finishUpload(uploadId, fileKey, etags);
      return new Response("OK");
    }

    throw new Error("Made it to the end of the upload handler without returning a response");
  } catch (error) {
    return new Response(`Error uploading file ${error}`, { status: 500 });
  }
};
