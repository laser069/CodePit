import api from "../api";

export type Example = {
    input:string;
    output:string;
}
export type TestCase = {
    input:string;
    expected_output:string;
}



export type Problem = {
    id:number;
    title:string;
    problem_statement:string;
    examples:Example[];
    testcase:TestCase[];
}

export const getProblems = async ():Promise<Problem[]>=>{
    const res = await api.get("/problems/")
    return res.data;
}