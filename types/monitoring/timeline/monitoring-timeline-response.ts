export interface MonitoringTimelineResponse {
  error: boolean;
  message: {
    buktiPengerjaan: [
      {
        _id: string;
        cardId: string;
        urlImg: string;
        boardOriginName: string;
        uploadDate: string;
        assignDate: string;
        __v: number;
      },
    ];
  };
}
