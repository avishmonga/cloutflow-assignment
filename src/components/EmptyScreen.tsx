import { Button, Empty, Typography } from 'antd';

interface EmptyScreenProps {
  description: string;
  handleButton?: () => void;
  buttonText?: string;
}
const EmptyScreen = ({
  description,
  handleButton,
  buttonText,
}: EmptyScreenProps) => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={<Typography.Text>{description}</Typography.Text>}
    >
      {handleButton && (
        <Button onClick={handleButton} type="primary">
          {buttonText || 'Customize'}
        </Button>
      )}
    </Empty>
  );
};

export default EmptyScreen;
