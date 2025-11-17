import UserServices from '../../../src/services/userServices.js';
import { describe, test, expect } from '@jest/globals'

test('Deve validar e tratar o tipo corretamente, retornando um número inteiro', () => {
    const user = {
        tipo: '1',
    };

    UserServices.validateUserType(user);

    expect(user.tipo).toBe(1);
});

test('Deve validar o tipo e jogar erro referente ao tipo de usuário', () => {
    const user = {
        tipo: '3',
    };

    expect(() => UserServices.validateUserType(user)).toThrow('O usuário deve ser Administrador ou Padrão!');
});

test('Deve validar o tipo e jogar erro referente ao tipo de dado informado', () => {
    const user = {
        tipo: 'teste string',
    };

    expect(() => UserServices.validateUserType(user)).toThrow('O Tipo do usuário deve ser um número válido!');
});

test('Deve validar os ids e jogar erro referente ao usuário logado', () => {
    const userId = 1;
    const loggedUserId = 1;

    expect(() => UserServices.deleteUser(userId, loggedUserId)).toThrow('Não é permitido excluir o próprio usuário!');
});
