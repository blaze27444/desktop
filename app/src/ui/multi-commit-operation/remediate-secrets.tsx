import { MultiCommitOperationKind } from '../../models/multi-commit-operation'
import { BaseRebase } from './base-rebase'

export abstract class RemediateSecrets extends BaseRebase {
  protected conflictDialogOperationPrefix = 'remediating secrets in commits on'
  protected rebaseKind = MultiCommitOperationKind.RemediateSecret
}
