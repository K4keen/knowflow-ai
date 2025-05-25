'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function DocumentUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('上传失败');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || '上传出错');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>上传 PDF 文档</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          disabled={uploading}
          onChange={handleFileChange}
        />
        {uploading && <Progress value={progress} className="mt-4" />}
        {success && <div className="text-green-600 mt-2">上传成功！</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          选择文件
        </Button>
      </CardFooter>
    </Card>
  );
}
