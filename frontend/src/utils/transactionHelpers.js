import {getCategoryName, getTransactionType} from "../utils/transactionHelpers";

export function getCategoryName(categories, categoryId) {

    const category = categories.find(

        category => category.id === categoryId

    );

    return category

        ? category.name

        : "Categoria não encontrada";

}

export function getTransactionType(type) {

    switch(type){

        case "income":
            return "Receita";

        case "expense":
            return "Despesa";

        default:
            return type;

    }

}