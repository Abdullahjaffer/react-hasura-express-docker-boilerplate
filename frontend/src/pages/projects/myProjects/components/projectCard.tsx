import { Card, Typography } from 'antd';

interface IProjectCards {
  name: string;
  description: string;
}

const ProjectCard = (props: IProjectCards) => {
  console.log(props);
  return (
    <Card
      title={props.name}
      size="small"
      style={{
        height: 200,
      }}
    >
      <Typography.Paragraph ellipsis={{ rows: 4 }}>{props.description}</Typography.Paragraph>
    </Card>
  );
};

export default ProjectCard;
