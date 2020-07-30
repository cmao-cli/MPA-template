declare namespace preact {
  namespace JSX {
    interface HTMLAttributes<RefType extends EventTarget = EventTarget> {
      // preact-router
      native?:boolean;
    }
  }
}
