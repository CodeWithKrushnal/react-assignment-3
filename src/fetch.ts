import {Resp} from './types/types.ts'

const fetchData = async (setData: React.Dispatch<React.SetStateAction<Resp>>, setDisplayData: React.Dispatch<React.SetStateAction<Resp>>) => {
    const response: Response = await fetch("https://reqres.in/api/users?per_page=12");
    const json: Resp = await response.json();
    setData(json);
    setDisplayData(json);
};

export default fetchData;