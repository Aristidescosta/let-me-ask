interface AdminRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminRoomPage({ params }: AdminRoomPageProps) {
  const { id } = await params;

  return (
    <main className="flex flex-1 items-center justify-center min-h-screen">
      <p className="text-zinc-500">Admin — Sala {id} — em construção</p>
    </main>
  );
}
