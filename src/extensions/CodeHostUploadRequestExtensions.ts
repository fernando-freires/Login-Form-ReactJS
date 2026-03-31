import { CodeHostUploadRequest } from "../models/CodeHostUploadRequest";
import { CodeHostUpload } from "../models/CodeHostUpload";
import { CodeHostEnum } from "../enums/CodeHostEnum";

// Helper function to remove all white spaces including internos
function removeAllSpaces(input: string): string {
  return input.replace(/\s+/g, "");
}

// Converts a string to CodeHostEnum in a case-insensitive way
function parseCodeHostEnum(value: string): CodeHostEnum {
  const lowerValue = value.toLowerCase();
  for (const enumKey in CodeHostEnum) {
    if (CodeHostEnum[enumKey as keyof typeof CodeHostEnum].toLowerCase() === lowerValue) {
      return CodeHostEnum[enumKey as keyof typeof CodeHostEnum];
    }
  }
  throw new Error(`Invalid CodeHostType: ${value}`);
}

export function toDomain(request: CodeHostUploadRequest): CodeHostUpload {
  // Process tokens e campos textuais: remove todos os espaços internos e trata valores nulos
  const accessToken = request.CodeHostAccessToken ? removeAllSpaces(request.CodeHostAccessToken) : "";
  const organization = request.CodeHostOrganization ? removeAllSpaces(request.CodeHostOrganization) : "";
  const project = request.CodeHostProject ? removeAllSpaces(request.CodeHostProject) : "";
  const repository = request.CodeHostRepository ? removeAllSpaces(request.CodeHostRepository) : "";

  // Processamento das branches
  let baseBranch = request.CodeHostBaseBranch ? removeAllSpaces(request.CodeHostBaseBranch) : "";
  if (!baseBranch) {
    baseBranch = "main";
  }

  let newBranch = request.NewBranch ? removeAllSpaces(request.NewBranch) : "";
  if (!newBranch) {
    newBranch = null;
  }

  // Conversão do tipo de repositório para Enum de forma case-insensitive
  const codeHostType = parseCodeHostEnum(request.CodeHostType);

  return {
    CodeHostAccessToken: accessToken,
    CodeHostOrganization: organization,
    CodeHostProject: project,
    CodeHostRepository: repository,
    CodeHostBaseBranch: baseBranch,
    NewBranch: newBranch,
    CreateNewBranch: request.CreateNewBranch,
    CreatePullRequest: request.CreatePullRequest,
    CodeHostType: codeHostType
  };
}
