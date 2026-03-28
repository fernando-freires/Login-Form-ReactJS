import { CodeHostEnum } from "../enums/CodeHostEnum";

export class CodeHostUpload {
  public codeHostAccessToken: string;
  public organizacao: string;
  public projeto: string;
  public repositorio: string;
  public branchBase: string;
  public novaBranch: string | null;
  public createNewBranch: boolean;
  public createPullRequest: boolean;
  public codeHostType: CodeHostEnum;

  constructor(
    codeHostAccessToken: string,
    organizacao: string,
    projeto: string,
    repositorio: string,
    branchBase: string,
    novaBranch: string | null,
    createNewBranch: boolean,
    createPullRequest: boolean,
    codeHostType: CodeHostEnum
  ) {
    this.codeHostAccessToken = codeHostAccessToken;
    this.organizacao = organizacao;
    this.projeto = projeto;
    this.repositorio = repositorio;
    this.branchBase = branchBase;
    this.novaBranch = novaBranch;
    this.createNewBranch = createNewBranch;
    this.createPullRequest = createPullRequest;
    this.codeHostType = codeHostType;
  }
}
