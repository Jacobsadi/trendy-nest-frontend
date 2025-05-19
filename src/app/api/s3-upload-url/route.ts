import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY!,
    secretAccessKey: process.env.MY_S3_SECRET_ACCESS!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { filename, fileType } = await req.json();

    const key = `seller-products/${Date.now()}_${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return NextResponse.json({
      url: signedUrl,
      key,
    });
  } catch (error) {
    console.error("S3 signing error:", error);
    return NextResponse.json(
      { error: "Failed to create S3 signed URL" },
      { status: 500 }
    );
  }
}
