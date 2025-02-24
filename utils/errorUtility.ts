interface CustomError extends Error {
    status: number;
}

const throwError = (status: number, message: string): never => {
    const error = new Error(message) as CustomError;
    error.status = status;
    throw error;
};

export { throwError };