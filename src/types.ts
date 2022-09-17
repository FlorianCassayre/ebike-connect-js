/**
 * @pattern ^[1-9]\d+$
 */
type StringInteger = string;

export interface ResponseError {
  errors: { code: number; message: string }[];
}

export interface ResponseVersionNumber {
  version: string;
}

export interface ResponseApiVersion {
  api_version: string;
}

interface CommonActivity {
  id: StringInteger;
  start_time: StringInteger;
  end_time: StringInteger;
  driving_time: StringInteger;
  status: 0 | 1;
  total_distance: number;
}

type CommonActivityRich = CommonActivity & {
  calories: number;
  avg_speed: number;
  max_speed: number;
};

type CommonActivityRide = CommonActivityRich & {
  type: 'BIKE_RIDE';
  title: string;
};

type CommonActivityTrip = CommonActivity & {
  type: 'NORMAL_TRIP';
};

export type CommonActivityRecord = CommonActivityRich & {
  operation_time: StringInteger;
  header_type: 'TRIP_DETAILS';
  avg_heart_rate: number;
  avg_cadence: number;
  avg_altitude: number;
  max_heart_rate: number;
  max_cadence: number;
  max_altitude: number;
  cadence: (number | null)[][];
  heart_rate: (number | null)[][];
  speed: number[][];
  coordinates: ([number, number] | [null, null])[][];
  portal_altitudes: (number | null)[][];
  training_effect: number;
  training_load_peak: number;
  significant: 0 | 1;
  elevation_gain: number;
  elevation_loss: number;
  total_driver_power: number;
  total_driver_consumption_percentage: number;
  total_battery_consumption_percentage: number;
  bui_decoded_part_number: StringInteger;
  drive_unit_decoded_serial_number: string;
  drive_unit_decoded_part_number: string;
  average_driver_power: number;
  power_output: (number | null)[][];
  significant_assistance_level_percentages: {
    level: number;
    value: number;
  }[];
  drive_unit_serial: StringInteger;
};

export type ResponseActivityRide = CommonActivityRecord &
  CommonActivityRide & {
    speed_weight: number;
    cadence_weight: number;
    driver_power_weight: number;
    bui_decoded_serial_number: string;
  };

export type ResponseActivityTrip = CommonActivityRecord & CommonActivityTrip;

type ActivityTripHeader = CommonActivityTrip & {
  header_rides_ids: StringInteger[];
  ride_headers: (CommonActivityRide & {
    header_rides_ids: [StringInteger];
  })[];
};

export type ResponseActivityTripHeaders = ActivityTripHeader[];

interface Screen {
  active_layout: string;
  graph: string[];
  mixed: string[];
  values: string[];
}

interface EBike {
  drive_unit: {
    device_name: string;
    product_line_name: string;
    bike_manufacturer_name: string;
    software_version: string;
    hardware_version: string;
    type: number;
    max_speed_for_udam: number;
    max_assist_factor: number;
    features: ('ELOCK' | string)[];
    favorite_screens: {
      fitness: Screen;
      bike: Screen;
    };
    custom_assistance_levels: { x: number; y: number }[][];
    lock_service_enabled: 0 | 1;
    settings_modified_at: {
      id: StringInteger;
      bike_settings_ts: StringInteger;
      custom_assistance_levels_ts: StringInteger;
      favorite_screen_bike_ts: StringInteger;
      favorite_screen_fitness_ts: StringInteger;
    };
    encoded_serial_number: StringInteger;
    serial: string;
    part_number: string;
    is_s_pedelec: 0;
  };
  buis: [
    {
      // Property `type` is duplicated
      type: string;
      device_line_name: string;
      last_synced: StringInteger;
      activities_uploaded_until: StringInteger;
      software_version: string;
      device_name: string;
      serial: string;
      part_number: string;
    },
  ];
  batteries: [
    {
      software_version: string;
      hardware_version: string;
      device_name: string;
      type: string;
      serial: string;
      part_number: string;
    },
  ];
}

export interface ResponseMyEbikes {
  my_ebikes: EBike[];
}
