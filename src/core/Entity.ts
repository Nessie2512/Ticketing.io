
export  class Entity <props>{
    private _id: string;
    private _createdAt: Date;
    private _editedAt?: Date;
    private props: props;

    constructor(props: props, id?: string) {
        this._id = id ?? crypto.randomUUID();
        this.props = props;
        this._createdAt = new Date();
    }

    get id(): string {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get editedAt(): Date | undefined {
        return this._editedAt;
    }

}