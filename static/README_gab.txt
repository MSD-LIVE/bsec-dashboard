**Flash Drought indicators at catchment scale for CONUS**

Gabriela Gesualdo<sup>1\*</sup> and Antonia Hadjimichael<sup>1</sup>

<sup>1 </sup> Department of Geosciences, The Pennsylvania State University, 116 Deike Building, University Park, PA 16801, USA

## Description
Flash droughts are defined by the rapid onset and intensification of drought conditions - a feature common across various proposed indicators. However, the absence of a standardized definition and detection method makes them particularly difficult to anticipate and manage. 
This dataset includes flash drought classifications based on six different methods across 222 catchments (4-digit Hydrologic Units, HUC4) in the Contiguous United States (CONUS) from 1983 to 2023. It also includes the pairwise agreement between indicators and the event-level multi-indicator agreement.

## Data
|              Dataset             | Description                                                                |                     File                     |
| :------------------------------: | :------------------------------------------------------------------------- | :------------------------------------------: |
| Flash Drought Indicators by HUC4 | Flash drought classifications from 1983 to 2023 for each HUC4 unit         |                 `FDextracted`                |
|        Correlation Matrix        | Mean correlation between indicators across all HUC4 units                  |        `correlation_matrix_Garal.csv`        |
|     Number of Events per HUC4    | Count and duration of events by indicator and HUC4 unit                    |          `event_counts_per_huc4.csv`         |
| Events per Indicator Combination | Number and duration of events by indicator combinations for each HUC4 unit | `huc4_event_summary_by_method_threshold.csv` |
|    Hydroclimatic Data by HUC4    | Hydroclimatic inputs from ERA5-Land averaged over each HUC4 unit           |           `HydroclimaticData_HUC4`           |

