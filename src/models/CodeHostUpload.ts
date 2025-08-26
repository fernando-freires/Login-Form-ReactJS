import { CodeHostEnum } from "../enums/CodeHostEnum";

export interface CodeHostUpload {
  CodeHostAccessToken: string;
  CodeHostOrganization: string;
  CodeHostProject: string;
  CodeHostRepository: string;
  CodeHostBaseBranch: string;
  NewBranch: string | null;
  CreateNewBranch: boolean;
  CreatePullRequest: boolean;
  CodeHostType: CodeHostEnum;
}
