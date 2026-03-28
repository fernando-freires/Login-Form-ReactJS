export interface CodeHostUploadRequest {
  CodeHostAccessToken: string | null;
  Organizacao?: string | null;
  Projeto?: string | null;
  Repositorio?: string | null;
  BranchBase?: string | null;
  NovaBranch?: string | null;
  CreateNewBranch: boolean;
  CreatePullRequest: boolean;
  CodeHostType: string;
}
