
export default async (dispatchMethod, type, data  ) => {
    await dispatchMethod({ 
        type : type, 
        payload : {
            ...data
        }
    });
}

