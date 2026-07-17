import {Button} from "uiwai-lib";
import {Card,ProfileCard} from "uiwai-lib";

export default function  App() {
  return (<>
    <Button
      text="Getting started"
      bgColor="red"
      hoverColor="#b30000"
      textColor="#fff"
      size="small"
    />
    <Card title="simla" description="This is a simple card component." buttonText="call to action" />
    <ProfileCard name="John Doe" role="Software Engineer" bio="Building innovative solutions for the web." />
  </>
  );
}
