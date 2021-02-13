declare module "react-select-country-list" {
    interface ICountryData {
        label: string;
        value: string
    }

    interface ILabelValueMap {
        [key: string]: string
    }

    interface ICountries {
        data: Array<ICountryData>;
        labelMap: ILabelValueMap;
        valueMap: ILabelValueMap;
    }

    class CountryList {
        data: Array<ICountryData>;
        labelMap: ILabelValueMap;
        valueMap: ILabelValueMap;

        getValue(label: string): string;
        getLabel(value: string): string;
        getLabels(): Array<string>;
        getValues(): Array<string>;
        getLabelList(): ILabelValueMap;
        getValueList(): ILabelValueMap;
        getData(): Array<ICountryData>;
        setLabel(value: string, label: string): ICountries;
        setEmpty(label: string): ICountries;
        native(): ICountries;
    }

    const countryList: () => CountryList;

    export = countryList;
}