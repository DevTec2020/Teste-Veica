import { NextResponse } from "next/server";
import { userRepo } from "@/lib/db";
import { UserProvider} from "@/contexts/UserContext"


export async function POST(request) {
  try {
    const body = await request.json();
    const { login, senha } = body;

    // Pergunta ao banco se o usuário existe
    const user = userRepo.authenticate(login, senha);

    // OK Liberado
    if (user) {
      return NextResponse.json({ user }); 
    }

    // Login Não Autorizado
    return NextResponse.json(
      { message: "Usuário ou senha inválidos" },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
        { message: `Erro interno no servidor ${error}` }, 
        { status: 500 }
    );
  }
}