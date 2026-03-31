export interface CodeHostUploadRequest {
  CodeHostAccessToken: string | null;
  CodeHostOrganization: string | null;
  CodeHostProject: string | null;
  CodeHostRepository: string | null;
  CodeHostBaseBranch?: string | null;
  NewBranch?: string | null;
  CreateNewBranch: boolean;
  CreatePullRequest: boolean;
  CodeHostType: string;
}
