//useReducer tipo per il payload
type PageAction =
  | { type: "INIT_DATA"; payload: { initialData: ConfigPublicKeyValue[] } }
  | { type: "EDIT_KEY_NAME"; payload: { index: number; value: string } }
  
  function reducer(state: ConfigPublicKeyValue[], action: PageAction) {
  switch (action.type) {
    case "INIT_DATA":
      return action.payload.initialData;
    case "EDIT_KEY_NAME":
      return state.map((item, k) => (k === action.payload.index ? { ...item, name: action.payload.value } : item));
      
     default:
      throw new Error();
  }
}

function ConfigPublicKey(){

const [dataPage, dispatch] = useReducer(reducer, []);
//Mount del componente
  useEffect(() => {
    _fetchPublicKeys();
  }, []);

  async function _fetchPublicKeys() {
    const response = await fetch(`${API_HOST}/api/v1/public-keys/getall`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const data: ConfigPublicKeyValue[] = await response.json();
    console.log(data);

    /** INIT stato */
    dispatch({ type: "INIT_DATA", payload: { initialData: data } });
  }
  
};
