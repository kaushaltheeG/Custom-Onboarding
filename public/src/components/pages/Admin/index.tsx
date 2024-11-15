import React from "react";
import { ButtonContainer, CenteringDiv, Container, OptionContainer, StyledLabel } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getSite, getSiteError } from "../../../services/site/selectors";
import useAdmin from "../../../hooks/useAdmin";
import { IComponent } from "../../../services/site/model";
import DynamicSelect from "../../ui/DynamicSelect";
import RoundedButton from "../../ui/RoundedButton";
import { Dispatch } from "redux";
import { ISiteActions, updateSiteLayout } from "../../../services/site/actions";
import ErrorComponent from "../../ui/ErrorComponent";
import { useNavigate } from "react-router";

const Admin: React.FC = () => {
  const mainSite = useSelector(getSite);
  const { components, updatePage, updateOrder, typeToLabel, intTodropdownValueMap } = useAdmin(mainSite);
  const dispatch = useDispatch<Dispatch<ISiteActions>>();
  const layoutError = useSelector(getSiteError);
  const navigate = useNavigate();

  const renderOptions = React.useCallback(() => {
    return components.map((component: IComponent) => {
      return (
        <OptionContainer>
          <StyledLabel>{typeToLabel[component.type]}</StyledLabel>
          <DynamicSelect
            label="Page"
            name="page"
            value={intTodropdownValueMap[component.page]}
            onChange={(e) => updatePage(component.type, e)}
            options={['Hide','Two','Three']}
          />
          <DynamicSelect
            label="Order"
            name="order"
            value={intTodropdownValueMap[component.order]}
            onChange={(e) => updateOrder(component.type, e)}
            options={['One','Two']}
          />
        </OptionContainer>
      );
    })
  },[components, updateOrder, updatePage, typeToLabel])

  const handleOnClick = React.useCallback(() => {
    dispatch(updateSiteLayout(components, navigate));
  }, [components, dispatch]);

  if (!mainSite) {
    return null;
  }

  return (
    <CenteringDiv>
      <Container>
        {renderOptions()}
        <ButtonContainer>
          {layoutError && <ErrorComponent message={layoutError.message} />}
          <RoundedButton onClick={handleOnClick}>Submit</RoundedButton>
        </ButtonContainer>
      </Container>
    </CenteringDiv>
  )
};

export default Admin;
