'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { FaPlus, FaUser, FaCog, FaThLarge, FaBars, FaUpload } from 'react-icons/fa';
import { NavigationMenuDemo } from '@/components/navigation/NavigationBar';
import { DropdownMenuDemo } from '@/components/navigation/DropdownMenu';
import Image from 'next/image';
import Link from 'next/link';
import DocumentUpload from '@/components/documents/DocumentUpload';
import { notebooks } from '@/data/notebook';


export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* 顶部导航栏 */}
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/Knowflow.png" alt="Knowflow Logo" width={40} height={40} />
            <span className="ml-2 text-2xl font-bold tracking-tight pr-8">Knowflow</span>
          </Link>
          {/* 导航链接 */}
          <NavigationMenuDemo />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <FaCog className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <FaThLarge className="w-5 h-5" />
          </Button>
          <DropdownMenuDemo />
        </div>
      </header>

      {/* 主体内容 */}
      <main className="flex-1 flex flex-col items-center pt-12">
        <div className="w-full flex justify-center pt-12 pb-8">
          <h1 className="text-6xl font-extrabold mb-10 tracking-tight pr-8">欢迎使用 Knowflow</h1>
        </div>
        <div className="w-full max-w-7xl mx-auto mb-8 px-2">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto mb-8 gap-4">
            <Button className="rounded-full px-6 py-2 flex items-center gap-2 text-base font-medium">
              <FaPlus /> 新建
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="bg-white border">
                <FaThLarge />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white">
                <FaBars />
              </Button>
              <Button variant="outline" className="bg-white border">
                最近
              </Button>
            </div>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {notebooks.map((nb) => (
              <Card
                key={nb.id}
                className={`relative transition-shadow hover:shadow-2xl ${
                  nb.highlight ? 'bg-yellow-100' : 'bg-gray-900 text-white'
                }`}
              >
                <CardHeader>
                  <span className="text-3xl">{nb.icon}</span>
                  <CardTitle className="mt-2 text-lg">{nb.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-300">
                  {nb.date} · {nb.sources} 个来源
                  <div className="flex items-center gap-1 mt-2 text-gray-400">
                    <FaUser className="w-4 h-4" /> {nb.user}
                  </div>
                </CardContent>
                {/* 右上角更多按钮（可扩展） */}
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                    <FaBars />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
