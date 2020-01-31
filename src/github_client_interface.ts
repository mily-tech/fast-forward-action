export interface GitHubClient {
  get_current_pull_request_number(): number,
  comment_on_pull_request_async(pr_number:number, comment:string): Promise<void>,
  fast_forward_target_to_source_async(pr_number: number): Promise<void>, 
  close_pull_request_async(pr_number: number): Promise<void>
}