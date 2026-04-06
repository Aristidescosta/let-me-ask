interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;

  return (
    <main className="flex flex-1 items-center justify-center min-h-screen">
      <p className="text-zinc-500">Sala {id} — em construção</p>
    </main>
  );
}
