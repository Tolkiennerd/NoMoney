import { JSX } from "preact/jsx-runtime";

export interface BaseQuestionProps {
    id: string;
    back: string;
    next: string;
}

export interface QuestionProps extends BaseQuestionProps {
    question: string | JSX.Element;
    input?: JSX.Element;
    value?: any;
    setValue?: any;
    setAmount?: any;
}

export interface ExpenseQuestionProps extends BaseQuestionProps {
    question: string | JSX.Element;
    frequency: string;
}

export interface DeductionQuestionProps extends BaseQuestionProps {
    question: string | JSX.Element;
    frequency: string;
}

export interface HowMuchQuestionProps extends BaseQuestionProps {
    frequency: string;
}

export interface TaxesQuestionProps extends BaseQuestionProps {
}
