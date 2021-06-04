import IApiService from "types/services/api-service";
import React from "react";

const {
	Provider: ApiServiceProvider,
	Consumer: ApiServiceConsumer
} = React.createContext<Partial<IApiService>>({});

export { ApiServiceProvider, ApiServiceConsumer };
