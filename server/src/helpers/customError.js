class CustomError extends Error {
    constructor(message, status = 500) {
        super(message);

        // garante o nome correto da classe no stack trace
        this.name = this.constructor.name; 

        this.status = status;
        
        // mantenha o rastreamento de pilha (stack trace) limpo no V8 (Node.js)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default CustomError;