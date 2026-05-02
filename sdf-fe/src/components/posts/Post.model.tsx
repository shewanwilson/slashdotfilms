export default class Post {    
    post_id: number;
    parent_id: number;
    post_title: string;
    post_body: string;
    created_at: string;
    username: string;
    children: Post[];
    can_edit: boolean;

    constructor(row: any) {
        this.post_id = row.post_id;
        this.parent_id = row.parent_id;
        this.post_title = row.post_title;
        this.post_body = row.post_body;
        this.created_at = row.created_at;
        this.username = row.username;
        this.children = [];
        this.can_edit = Boolean(row.can_edit)
    }

    public addChild(post: Post): void {
        this.children.push(post);
    }

    // Returns posts that are nested/susequent children of the Post instance
    public getChildren(): Post[] {
        return this.children;
    }

    public isRoot(): boolean {
        return this.parent_id === 0;
    }

    public getPostId(): number {
        return this.post_id;
    }

    public getTitle(): string {
        return this.post_title;
    }

    public getDateFormat(): string{
        const date = new Date(this.created_at);
    
        const datestamp =
            date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            }) +
            " " +
            date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });

        return datestamp;    
    }
}