import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
// import { ElfsightWidget } from 'react-elfsight-widget';

import { b3HexToRgb, getContrastColor } from '@/components/outSideComponents/utils/b3CustomStyles';
import B3Spin from '@/components/spin/B3Spin';
import { useMobile } from '@/hooks';
import useStorageState from '@/hooks/useStorageState';
import { CustomStyleContext } from '@/shared/customStyleButton';

function TaxExemption() {
  const [isFinishUpdate, setIsFinishUpdate] = useStorageState<boolean>(
    'sf-isFinishUpdate',
    false,
    sessionStorage,
  );

  const {
    state: {
      portalStyle: { backgroundColor = '#FEF9F5' },
    },
  } = useContext(CustomStyleContext);

  const [isMobile] = useMobile();

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

      } finally {
        if (isFinishUpdate) {
          setIsFinishUpdate(false);
        }
        setLoading(false);
      }
    };

    init();
    // disabling as we only need to run this once and values at starting render are good enough
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinishUpdate]);

  return (
    <B3Spin isSpinning={isLoading} background={backgroundColor}>
      <Box>
        <Box
          id='taxExemption'
          sx={{
            width: isMobile ? '100%' : '35%',
            minHeight: isMobile ? '800px' : '300px',
            '& input, & .MuiFormControl-root .MuiTextField-root, & .MuiSelect-select.MuiSelect-filled, & .MuiTextField-root .MuiInputBase-multiline':
              {
                bgcolor: b3HexToRgb('#FFFFFF', 0.87),
                borderRadius: '4px',
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '0',
              },
            '& .MuiButtonBase-root.MuiCheckbox-root:not(.Mui-checked), & .MuiRadio-root:not(.Mui-checked)':
              {
                color: b3HexToRgb(getContrastColor(backgroundColor), 0.6),
              },
            '& .MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label, & .MuiFormControl-root .MuiFormLabel-root:not(.Mui-focused)':
              {
                color: b3HexToRgb(getContrastColor(backgroundColor), 0.87),
              },
            '& .MuiInputLabel-root.MuiInputLabel-formControl:not(.Mui-focused)': {
              color: b3HexToRgb(getContrastColor('#FFFFFF'), 0.6),
            },
          }}
        >
          <p>
            After submission of your sales tax certificate with this form, we will review your exemption and update your account for future orders.
          </p>
          {/* <ElfsightWidget widgetId={'31546aa4-00eb-4722-8f02-21495348b408'} lazy /> */}
        </Box>
      </Box>
    </B3Spin>
  );
}

export default TaxExemption;
