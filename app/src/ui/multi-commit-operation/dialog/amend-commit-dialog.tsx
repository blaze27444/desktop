import * as React from 'react'
import { Dialog, DialogContent, DialogFooter } from '../../dialog'
import { OkCancelButtonGroup } from '../../dialog/ok-cancel-button-group'

interface IAmendCommitDialogProps {
  readonly operation: string
  readonly onContinueRebase: () => Promise<void>
  readonly onAbort: () => Promise<void>
  readonly onDismissed: () => void
}

interface IAmendCommitDialogState {
  readonly isAborting: boolean
}

export class AmendCommitDialog extends React.Component<
  IAmendCommitDialogProps, IAmendCommitDialogState
> {
  public constructor(props: IAmendCommitDialogProps) {
    super(props)
    this.state = {
      isAborting: false,
    }
  }

  private onSubmit = async () => {
    this.props.onContinueRebase()
  }

  private onAbort = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    this.setState({ isAborting: true })
    await this.props.onAbort()
    this.setState({ isAborting: false })
  }

  public render() {
    const { operation } = this.props
    return (
      <Dialog
        id="amend-commit-dialog"
        title={
          __DARWIN__
            ? `Amend Commit: ${operation}`
            : `Amend commit: ${operation.toLowerCase()}`
        }
        onDismissed={this.props.onDismissed}
        onSubmit={this.onSubmit}
        disabled={this.state.isAborting}
      >
        <DialogContent>
          <div className="column-left" id="abort-operation-confirmation">
            <p>
              You are amending a commit! Go make the changes you want 
              and the hit continue to commit and move to the next one.
            </p>
          </div>
        </DialogContent>
        <DialogFooter>
          <OkCancelButtonGroup
            okButtonText={'Continue'}
            cancelButtonText={'Abort'}
            onCancelButtonClick={this.onAbort}
            cancelButtonDisabled={this.state.isAborting}
          />
        </DialogFooter>
      </Dialog>
    )
  }
}
