export interface PopulationResponse {

  years: number[];

  series: {
    name: string;
    data: number[];
  }[];

}