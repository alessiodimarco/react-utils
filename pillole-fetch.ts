function componente() {
  const [clientData, setClientData] = useState<ClientData[]>([]);
    
  useEffect(() => {
    _fetchClientData();
  }, []);

  async function _fetchClientData() {
    const response = await fetch(`${API_HOST}/api/v1/clients/get`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({ hostname: currentHost }),
    });

    const data: ClientData[] = await response.json();
    console.log(data);

    setClientData(
      data.map(item => {
        return { ...item, hostnames: item.hostnames.filter(host => host != null) };
      })
    );
  }

}
