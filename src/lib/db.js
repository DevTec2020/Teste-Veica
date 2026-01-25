const dadosDbGlobal = global;
const SOS_LOGN = process.env.LOGIN
const SOS_PASS = process.env.PASS

import bcrypt from "bcryptjs";

if (!dadosDbGlobal.users) {
  dadosDbGlobal.users = [];
}


export const userRepo = {
    //Traz tudo
    getAll: () => dadosDbGlobal.users,

    // Adiciona novo usuário
    create: (user) => {
        const senhaComHash = bcrypt.hashSync(user.senha, 5)

        const newUser = {
            ...user,
            senha:senhaComHash,
            id: crypto.randomUUID(),
            dataCadastro: new Date().toISOString()
        };

        const findUser = dadosDbGlobal.users.find(u => u.login === user.login);

        // Verificação se o usuário já existe no banco 
        if (findUser){
            throw new Error("DUPLICATE_USER");
        }
        
        // Criando usuário
        dadosDbGlobal.users.push(newUser);
        
        return newUser;
    },


    // Edita usuário existente
    update: (id, params) => {
        const user = dadosDbGlobal.users.find(u => u.id === id);
        
        // Criptografando senha depois de atualizar
        if (user && params.senha){
            params.senha = bcrypt.hashSync(params.senha, 5);
        }
        
        if (user) Object.assign(user, params);

        return user;
    },

    // Remove usuário
    delete: (id) => {
        dadosDbGlobal.users = dadosDbGlobal.users.filter(x => x.id !== id);
    },

    // Valida Login
    authenticate: (login, senha) => {
        // Validando se o login é do Usuário Admin geral => Veica
        if (login === SOS_LOGN && senha === SOS_PASS) {
            return {
                id: 'sos',
                login: SOS_LOGN,
            };
        }

        // busca nos usuários cadastrados
        const user = dadosDbGlobal.users.find(u => u.login === login);

        //Achou ? compara a senha hash
        if (user && bcrypt.compareSync(senha, user.senha)) {


            // Retornando o usuário sem a senha
            // const { senha, ...userWithoutPass } = user;
            // return userWithoutPass;

            //Aqui eu retorno o dataCadastro, id, login e senha propositalmente para ver que está criptografado, mas em cima tem o codigo que retorna sem a senha.
            return user;
        }

        return null;
    }
}