import { Context, createContext } from "preact";
import { Dispatch } from "preact/hooks";

interface QuestionIndexContextType {
	questionIndex: number;
	setQuestionIndex: Dispatch<number>;
}
export const QuestionIndexContext: Context<QuestionIndexContextType> = createContext(null);
