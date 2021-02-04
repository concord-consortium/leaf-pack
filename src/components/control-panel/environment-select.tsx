import React from "react";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { EnvironmentType, Environments, Environment } from "../../utils/sim-utils";
import ExpandIcon from "../../assets/expand-icon.svg";
import IconEnvironment from "../../assets/stream-icon.svg";
import t from "../../utils/translation/translate";

import "./environment-select.scss";

interface IProps {
  environment: EnvironmentType;
  disabled: boolean;
  onChange: (value: EnvironmentType) => void;
}

export const EnvironmentSelect: React.FC<IProps> = (props) => {

  const { environment, disabled, onChange } = props;

  const handleChange = (event: React.ChangeEvent<{value: EnvironmentType;}>) => {
    const environmentType = event.target.value;
    onChange(environmentType);
  };

  return (
    <div className="environment-select" data-testid="environment-select">
      <div className="header">
        <IconEnvironment />
        <div className="label">{t("ENVIRONMENT.LABEL")}</div>
      </div>
      <FormControl
        variant="outlined"
        margin="dense"
        className={`location-select ${disabled ? "disabled" : ""}`}
        data-testid="location-select"
      >
        <Select
          value={environment}
          name="environment"
          onChange={handleChange}
          IconComponent={ExpandIcon}
          disabled={disabled}
          aria-label={t("ENVIRONMENT.LABEL")}
        >
          {Environments.filter((env: Environment) => env.enabled).map((env: Environment, key) => (
            <MenuItem
              value={env.type}
              key={key}
              aria-label={env.name}
            >
              <div>
                {env.name}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
