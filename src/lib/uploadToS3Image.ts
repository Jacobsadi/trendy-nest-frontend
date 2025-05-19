// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// export async function uploadToS3Image(file: File): Promise<string> {
//   const region = process.env.NEXT_PUBLIC_AWS_REGION!;
//   const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
//   const accessKeyId = process.env.MY_S3_ACCESS_KEY!;
//   const secretAccessKey = process.env.MY_S3_SECRET_ACCESS!;

//   const s3Client = new S3Client({
//     region,
//     credentials: {
//       accessKeyId,
//       secretAccessKey,
//     },
//   });

//   const key = `seller-products/${Date.now()}_${Math.random()
//     .toString(36)
//     .substring(2, 15)}_${file.name}`;

//   const command = new PutObjectCommand({
//     Bucket: bucket,
//     Key: key,
//     ContentType: file.type,
//   });

//   const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

//   console.log("Signed PUT URL:", signedUrl);

//   const res = await fetch(signedUrl, {
//     method: "PUT",
//     headers: {
//       "Content-Type": file.type,
//     },
//     body: file,
//   });

//   if (!res.ok) {
//     console.log(res);
//     throw new Error("Failed to upload to S3");
//   }

//   return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
// }
// lib/uploadToS3Image.ts

export async function uploadToS3Image(file: File): Promise<string> {
  const res = await fetch("/api/s3-upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      fileType: file.type,
    }),
  });

  const { url, key } = await res.json();

  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload to S3");
  }

  const region = process.env.NEXT_PUBLIC_AWS_REGION!;
  const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
