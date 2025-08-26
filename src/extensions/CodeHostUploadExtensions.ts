import { CodeHostUploadRequest } from "../models/CodeHostUploadRequest";
import { CodeHostUpload } from "../models/CodeHostUpload";
import { CodeHostEnum } from "../enums/CodeHostEnum";

/**
 * Função de extensão que converte um objeto CodeHostUploadRequest para CodeHostUpload,
 * aplicando as regras de negócio definidas.
 */
export function toDomain(request: CodeHostUploadRequest): CodeHostUpload {
  // Regra 01 - CodeHostAccessToken: se nulo, atribuir string vazia e remover espaços
  const token = (request.CodeHostAccessToken || "").replace(/\s/g, "");

  // Regra 02 - Organização e Projeto: trim e se nulos, string vazia
  const organizacao = request.Organizacao ? request.Organizacao.trim() : "";
  const projeto = request.Projeto ? request.Projeto.trim() : "";

  // Regra 02 - Repositório: se nulo, string vazia, caso contrário remover TODOS os espaços internos
  const repositorio = request.Repositorio ? request.Repositorio.replace(/\s/g, "") : "";

  // Regra 03 - BranchBase: se nulo, atribuir 'main'; remover TODOS os espaços
  let branchBase = request.BranchBase ? request.BranchBase.replace(/\s/g, "") : "main";
  if (!branchBase) {
    branchBase = "main";
  }

  // Regra 04 - NovaBranch: se apenas espaços ou vazia, deve ser null; caso contrário, remover TODOS os espaços
  let novaBranch: string | null = null;
  if (request.NovaBranch) {
    const cleanedNovaBranch = request.NovaBranch.replace(/\s/g, "");
    novaBranch = cleanedNovaBranch.length > 0 ? cleanedNovaBranch : null;
  } else {
    novaBranch = null;
  }

  // Regra 06 - CodeHostType: conversão para enum de forma case-insensitive
  let codeHostType: CodeHostEnum;
  const typeNormalized = request.CodeHostType.toLowerCase();

  switch (typeNormalized) {
    case CodeHostEnum.GITHUB:
      codeHostType = CodeHostEnum.GITHUB;
      break;
    case CodeHostEnum.GITLAB:
      codeHostType = CodeHostEnum.GITLAB;
      break;
    case CodeHostEnum.BITBUCKET:
      codeHostType = CodeHostEnum.BITBUCKET;
      break;
    default:
      throw new Error(`Tipo de CodeHost desconhecido: ${request.CodeHostType}`);
  }

  // Instanciação do objeto de domínio CodeHostUpload aplicando o construtor
  return new CodeHostUpload(
    token,
    organizacao,
    projeto,
    repositorio,
    branchBase,
    novaBranch,
    request.CreateNewBranch,
    request.CreatePullRequest,
    codeHostType
  );
}
