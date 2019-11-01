interface GroupOptions {
    readonly name: string;
    readonly description: string;
    readonly ownerOnly: boolean;
    readonly guildOnly?: boolean;
}

export default class Group implements GroupOptions {
    readonly name: string;
    readonly description: string;
    readonly ownerOnly: boolean;
    readonly guildOnly: boolean;
    
    protected constructor (options: GroupOptions) {
        this.name = options.name;
        this.description = options.description;
        this.ownerOnly = options.ownerOnly || false;
        this.guildOnly = options.guildOnly || false;
    }
}