import React, { ComponentType } from "react";

import { ApiServiceConsumer } from "../contexts";
import IApiService from "types/services/api-service";

interface IProps {
	apiService: IApiService;
}

const withApiService = () => <T extends IProps>(Wrapped: ComponentType<T>) => (props: any) => (
	<ApiServiceConsumer>
		{(apiService) => (
			<Wrapped {...props} apiService={apiService} />
		)}
	</ApiServiceConsumer>
);

export default withApiService;