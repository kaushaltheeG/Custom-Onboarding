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

const Admin: React.FC = () => {
  const mainSite = useSelector(getSite);
  const { components, updatePage, updateOrder, typeToLabel } = useAdmin(mainSite);
  const dispatch = useDispatch<Dispatch<ISiteActions>>();
  const layoutError = useSelector(getSiteError);
  
  const renderOptions = React.useCallback(() => {
    return components.map((component: IComponent) => {
      return (
        <OptionContainer>
          <StyledLabel>{typeToLabel[component.type]}</StyledLabel>
          <DynamicSelect
            label="Page"
            name="page"
            value={component.page}
            onChange={(e) => updatePage(component.type, e)}
            options={[0,2,3]}
          />
          <DynamicSelect
            label="Order"
            name="order"
            value={component.order}
            onChange={(e) => updateOrder(component.type, e)}
            options={[1,2]}
          />
        </OptionContainer>
      );
    })
  },[components, updateOrder, updatePage, typeToLabel])

  const handleOnClick = React.useCallback(() => {
    dispatch(updateSiteLayout(components));
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
