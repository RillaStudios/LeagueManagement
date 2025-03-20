import Align from "@/lib/components/layout/align";
import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import Row from "@/lib/components/layout/row";
import Stack from "@/lib/components/layout/stack";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";

export default function Home() {
  return (
    <Page
      header={<Header />} // Empty header
      footer={<Footer />} // Empty footer
      children={
        <div className="z-[-1]">
          <div className="h-[800px]">
            <Column
              expanded={true} // Make the column expand to fill remaining space
              mainAxisAlign="evenly" // Align content vertically with space between
              crossAxisAlign="end" // Align content horizontally at the end
              wrap={false} // Disable wrapping
              gap={"5"} // Set the gap between children to 4
            >
              <h1>Title</h1>
              <p>Some content</p>
              <p>More content</p>
              <h1>Title</h1>
              <p>Some content</p>
              <p>More content</p>
            </Column>
          </div>
          <Container width="w-[100px]">
            <Row
              expanded={true}
              mainAxisAlign="evenly"
              crossAxisAlign="center"
              wrap={false}
            >
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
            </Row>
          </Container>
          <Container height="h-[800px]">
            <Stack>
              <Container color="bg-red-500" width="w-[200px] h-[200px]">
                <h1>Stack</h1>
              </Container>
              <h1>Stack</h1>
              <h1>Stack</h1>
              <Container color="bg-blue-500" width="w-[30px] h-[30px]">
                <h1>Stack</h1>
              </Container>
              <Align align="middle-center">
                <Container color="bg-green-500" width="w-[20px] h-[20px]">
                  <h1>Stack</h1>
                </Container>
              </Align>
            </Stack>
          </Container>
          <div className="h-20"></div>
        </div>
      }
    />
  );
}
