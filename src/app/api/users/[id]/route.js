import { NextResponse } from "next/server";
import { userRepo } from "@/lib/db";

// PUT para atualizar usuário
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedUser = userRepo.update(id, body);

    if (!updatedUser) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);

  } catch (error) {
    return NextResponse.json({ message: "Erro ao atualizar" }, { status: 500 });
  }
}

// DELETE Removendo o usuário do id
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    userRepo.delete(id);
    
    return NextResponse.json({ message: "Usuário removido com sucesso" });

  } catch (error) {
    return NextResponse.json({ message: "Erro ao excluir" }, { status: 500 });
  }
}