export type CartaoForm = {
    numero: string 
    nome: string
    cartaoTipo: 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR' | string,
    usuarioId: string
}