export const Path = {
    relativeEntry: "/",
    root: "msauth",
    get fullRoot() {
        return this.relativeEntry + this.root;
    }
}
