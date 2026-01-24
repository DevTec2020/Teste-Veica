import { NextResponse } from "next/server";
import { userRepo } from "@/lib/db";

// GET de Listar todos os usuários 
export async function GET (){
    try {
        const users = userRepo.getAll();

        //Caso receber null ou undefined estou colocando um valor vazio no array
        if(!users){
            return NextResponse.json([])
        }

        // Estou só validando via console a quantidade de usuários que estão em memoria.
        console.log("API GET /users - Total na memória:", users.length);

        return NextResponse.json(users);

    } catch(error){
        console.error(`Erro no GET da API em /users ${error}`);
        return NextResponse.json([]);
    }
}

// POST para cadastrar um novo usuário
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Aqui eu queria apenas ver o que eu recebia do form para me ajudar e resolver um erro.
    //console.log("API POST /users - Recebido:", body);


    if (!body.login || !body.senha) {
        return NextResponse.json(
            { message: "Dados inválidos" },
            { status: 400 }
        );
    }

    const newUser = userRepo.create(body);
    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {

    // Erro de controle para se caso o usuário já exista
    if (error.message === "DUPLICATE_USER") {
        return NextResponse.json(
            { message: "Este usuário já existe." },
            { status: 409 }
        );
    }

    return NextResponse.json(
      { message: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}