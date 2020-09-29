export interface IAppliance {
  _id?: string;
  title: string;
  description: string;
  category: string;
  vendorCode: string | number;
}

export interface IApplianceProps {
  appliance: IAppliance;
  onRemove: (id: string) => void
}

export interface IFormProps {
  appliance: IAppliance;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export interface IUseParams {
  id?: string;
}

export interface IuseHttp {
  loading: boolean;
  request: (
    url: string,
    method: string,
    body?: unknown,
    headers?: unknown
  ) => Promise<any>;
  error: string | null;
  clearError: () => void;
}
